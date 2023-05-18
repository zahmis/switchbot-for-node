import axios from "axios";

export class SwitchBotAPI {
  private token: string;
  private secret: string;

  constructor(token: string, secret: string) {
    this.token = token;
    this.secret = secret;
  }

  public async getAllDevices() {
    try {
      const res = await axios(`https://api.switch-bot.com/v1.0/devices`, {
        headers: {
          Authorization: this.token,
        },
      });
      const data = await res.data;
      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`getAllDevicesError: ${err.message}`);
      }
    }
  }

  public async sendCommand(deviceId: string, command: string) {
    try {
      const res = await axios.post(
        `https://api.switch-bot.com/v1.0/devices/${deviceId}/commands`,
        {
          command,
          parameter: "default",
          commandType: "command",
        },
        {
          headers: {
            Authorization: this.token,
            secret: this.secret,
          },
        }
      );
      return res.data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`SendCommandError: ${err.message}`);
      }
    }
  }

  public async getDeviceStatus(deviceId: string) {
    const res = await axios.get(
      `https://api.switch-bot.com/v1.0/devices/${deviceId}/status`,
      {
        headers: {
          Authorization: this.token,
          secret: this.secret,
        },
      }
    );
    return res.data;
  }
}
