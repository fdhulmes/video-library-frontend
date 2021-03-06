import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Video } from '../video';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class VideoService {

  constructor(private httpClient: HttpClient) { }

  private videoUrl = 'https://channelcashmoney.herokuapp.com/api/videos';

  getAllVideos(): Observable<Video[]>{
    console.log('Fetching Videos');
    return this.httpClient.get<Video[]>(this.videoUrl + '/home');
  }

  getAuthorVideos(username: string): Observable<Video[]>{
    console.log(`Fetching Videos from ${username}`);
    return this.httpClient.get<Video[]>(this.videoUrl + `/user=${username}`);
  }

  getVideo(id: number): Observable<Video>{
    console.log(`Fetching Video Number ${id}`);
    return this.httpClient.get<Video>(this.videoUrl + `/id=${id}`);
  }

  searchVideo(term: string): Observable<Video[]>{
    return this.httpClient.get<Video[]>(this.videoUrl + `/search/${term}`)
  }

  uploadVideo(uploadVideo: File): Observable<string>{
    const endpoint = 'https://channelcashmoney.herokuapp.com/storage/uploadFile';
    const formData: FormData = new FormData();
    formData.append('file', uploadVideo, uploadVideo.name);
    return this.httpClient.post<any>(endpoint, formData, {responseType: 'text' as 'json'});
  }

  postVideo(toUpload: Video): Observable<Video> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    return this.httpClient.post<Video>(this.videoUrl + '/upload', toUpload, httpOptions)
      .pipe(catchError(this.handleError<Video>('postVideo')
    ));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


