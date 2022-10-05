import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  fileSelected?: Blob;
  imageUrl?: string;
  base64: string="";

  constructor(private sant:DomSanitizer) { }

  /**
 * Devuelve una promesa para transformar un File en un string base64
 * @param file
 * @returns
 */

public fileToBase64 = (file: File) => (new Promise((resolve, reject) => {

  var reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function() {
      resolve(reader.result);
  }

  reader.onerror = function(error) {
      reject(error);
  }
}));
}
