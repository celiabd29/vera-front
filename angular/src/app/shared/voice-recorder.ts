import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VoiceRecorderService {
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: BlobPart[] = [];
  private stream: MediaStream | null = null;
  private isRecording = false;

  async startRecording(): Promise<void> {
    if (this.isRecording) return;

    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    this.chunks = [];
    this.mediaRecorder = new MediaRecorder(this.stream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.chunks.push(event.data);
      }
    };

    this.mediaRecorder.start();
    this.isRecording = true;
  }

  async stopRecording(): Promise<Blob> {
    if (!this.isRecording || !this.mediaRecorder) {
      throw new Error('No recording in progress');
    }

    return new Promise<Blob>((resolve) => {
      this.mediaRecorder!.onstop = () => {
        const audioBlob = new Blob(this.chunks, { type: 'audio/webm' });

        if (this.stream) {
          this.stream.getTracks().forEach((track) => track.stop());
        }

        this.isRecording = false;
        this.mediaRecorder = null;
        this.stream = null;
        this.chunks = [];

        resolve(audioBlob);
      };

      this.mediaRecorder!.stop();
    });
  }

  getRecordingStatus(): boolean {
    return this.isRecording;
  }
}
