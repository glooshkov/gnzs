import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AmoCrmService {
  private clientId = '31992158';
  private tokenUrl = 'https://app2.gnzs.ru/amocrm/test/oauth/get-token.php';
  private accessToken: string;
  private baseDomain: string;

  constructor(private readonly http: HttpService) {}
  async getAccessToken() {
    try {
      const response = await this.http.get(this.tokenUrl, {
        headers: {
          'X-Client-Id': this.clientId,
          'Content-Type': 'application/json'
        },
      }).toPromise();

      this.accessToken = response.data.access_token;
      this.baseDomain = response.data.base_domain;
    } catch (error) {
      throw new Error('Ошибка получения токена: ' + error.message);
    }
  }
  async createEntity(entityType: string, data: any) {
    if (!this.accessToken || !this.baseDomain) {
      await this.getAccessToken();
    }

    const url = `https://${this.baseDomain}/api/v4/${entityType}`;
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
    try {
      const response = await this.http.post(url, data, { headers } ).toPromise();
      return response.data;
    } catch (error) {
      throw new Error('Ошибка создания сущности: ' + error.message);
    }
  }
}