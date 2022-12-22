import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable } from "@nestjs/common";
import { AxiosError, AxiosRequestConfig, Method, RawAxiosRequestHeaders } from "axios";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common/services/logger.service";
import * as querystring from "querystring";
import { catchError, firstValueFrom } from "rxjs";


@Injectable()
export class KongService {
  private kongProxyUrl: string;
  private kongAdminUrl: string;
  private kongAdminApikey: string;
  private logger: Logger;

  constructor(configService: ConfigService, private readonly httpService: HttpService) {
    this.logger = new Logger();
    this.kongProxyUrl = configService.get<string>("KONG_PROXY");
    this.kongAdminUrl = configService.get<string>("KONG_ADMIN");
    this.kongAdminApikey = configService.get<string>("KONG_ADMIN_API_KEY");
  }

  async sentRequestAdmin<ResponseModel>(method: Method, path = "/", body: any = {}, headers: RawAxiosRequestHeaders = {}, timeout = 30): Promise<ResponseModel> {
    const _data = querystring.stringify(body);
    const _url = `${this.kongAdminUrl}${path}`;
    const _headers = { ...headers, ...{ apikey: this.kongAdminApikey } };
    const config: AxiosRequestConfig = {
      method: method,
      timeout: timeout * 1000,
      url: _url,
      headers: _headers,
      data: _data

    };
    try {
      const { data } = await firstValueFrom(this.httpService.request<ResponseModel>(config).pipe(
        catchError((error: AxiosError) => {
          this.logger.warn(`
Error when  ${method} ${_url} ${error}
Please recheck KONG_ADMIN and KONG_ADMIN_API_KEY in .env file
        `);
          throw new HttpException(`${error.message} code : ${error.code}`, error.status);
        })
      ));
      return data;
    } catch (e) {
      this.logger.warn(e);
    }

  };


}
