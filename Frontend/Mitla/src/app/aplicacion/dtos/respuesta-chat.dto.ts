export interface FuenteChatDto {
  id_archivo?: number;
  titulo?: string;
  fragmento?: string;
}

export interface RespuestaChatDto {
  respuesta: string;
  id_base: number;
  nombre_base: string;
  fuentes: FuenteChatDto[];
  modo: 'simulado' | 'rag' | string;
}