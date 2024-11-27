import * as signalR from '@microsoft/signalr';
import { VITE_AZURE_API_URL } from './api';

class SignalRService {
	constructor() {
		this.connection = null;
		this.API_URL = `${VITE_AZURE_API_URL}/notificationHub`;
	}

	async startConnection() {
		try {
			const token = localStorage.getItem('token');

			if (!token) {
				throw new Error('No authentication token found');
			}

			console.log('🔌 Starting SignalR connection...');

			this.connection = new signalR.HubConnectionBuilder()
				.withUrl(this.API_URL, {
					accessTokenFactory: () => token,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					transport:
						signalR.HttpTransportType.WebSockets |
						signalR.HttpTransportType.LongPolling,
					withCredentials: true,
				})
				.configureLogging(signalR.LogLevel.Information)
				.withAutomaticReconnect()
				.build();

			this.connection.onclose((error) => {
				console.log('🔴 SignalR Connection closed:', error);
			});

			this.connection.onreconnecting((error) => {
				console.log('🟡 SignalR Reconnecting:', error);
			});

			this.connection.onreconnected((connectionId) => {
				console.log('🟢 SignalR Reconnected:', connectionId);
			});

			await this.connection.start();
			console.log('✅ SignalR Connected!');

			this.connection
				.invoke('GetConnectionId')
				.then((connectionId) => {
					console.log('🆔 SignalR Connection ID:', connectionId);
				})
				.catch((err) => {
					console.error('❌ Failed to get connection ID:', err);
				});
		} catch (err) {
			console.error('❌ SignalR Connection Error: ', err);
			throw err;
		}
	}

	onReceiveNotification(callback) {
		if (!this.connection) {
			console.error('No SignalR connection');
			return;
		}

		this.connection.on('ReceiveNotification', (notification) => {
			console.log('Received notification:', notification);
			callback(notification);
		});
	}

	async stopConnection() {
		if (this.connection) {
			try {
				await this.connection.stop();
				console.log('SignalR Disconnected');
			} catch (err) {
				console.error('SignalR Disconnection Error: ', err);
			}
		}
	}

	isConnected() {
		return this.connection?.state === signalR.HubConnectionState.Connected;
	}
}

export default new SignalRService();
