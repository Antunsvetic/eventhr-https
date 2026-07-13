import { HttpClient } from '@/api/common/HttpClient';


export type FileType = 'IMAGE' | 'VIDEO' | 'DOCUMENT';

export interface UploadedFile {
  id: string;
  fileName: string;
  url: string;
  fileSize: number;
  fileType: FileType;
  createdAt: string;
  updatedAt: string;
}



class FilesClient extends HttpClient {
  endpoint = 'api/v1/files';

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.client.post<UploadedFile>(this.endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  remove(id: string) {
    return this.client.delete<void>(`${this.endpoint}/${id}`);
  }
}

const v1 = new FilesClient();
export default v1;
