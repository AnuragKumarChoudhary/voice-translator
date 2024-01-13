import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  inputLanguage: any = 'English';
  outputLanguage: any = 'French';

  // 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

  constructor(private service: BackendService) { }

  startListening(event: any) {
    // console.log("Listening");
    // document.getElementById("output")!.innerHTML = "Loading text...";
    // let recognization = (window as { [key: string]: any })['webkitSpeechRecognition'];
    // recognization.onstart = () => {
    //   document.getElementById('action')!.innerHTML = "Listening...";
    // }
    // recognization.onresult = (e: any) => {
    //   var transcript = e.results[0][0].transcript;
    //   document.getElementById('output')!.innerHTML = transcript;
    //   document.getElementById('output')!.classList.remove("hide")
    //   document.getElementById('action')!.innerHTML = "";
    // }
    // recognization.start();
    var transcript;
    if ('webkitSpeechRecognition' in window && this.inputLanguage != this.outputLanguage) {
      console.log(window.webkitSpeechRecognition);
      let recognization: any = new webkitSpeechRecognition();
      console.log(recognization);

      recognization.onstart = () => {
        document.getElementById('action')!.innerHTML = "Listening...";
      }
      recognization.onresult = (e: any) => {
        transcript = e.results[0][0].transcript;
        document.getElementById('input')!.innerHTML = transcript;
        document.getElementById('input')!.classList.remove("hide")
        document.getElementById('action')!.innerHTML = "";
        document.getElementById("translating-notification")!.classList.remove("hide");
        this.service.getChatResponse({
          "model": "gpt-3.5-turbo",
          "messages": [
            {
              "role": "system",
              "content": `Translate the following phrase from ${this.inputLanguage} to ${this.outputLanguage} : '${transcript}'`
            }
          ]
        }).subscribe(data => {
          console.log(data["choices"][0]["message"]["content"]);
          document.getElementById('output')!.innerHTML = data["choices"][0]["message"]["content"];
          
        document.getElementById("translating-notification")!.classList.add("hide");
        })
      }
      recognization.start();


    }else{
      console.log("Translating from Same Language is not Supported");
      
    }
  }

  SelectOutputLanguage(event: any) {
    console.log(event.target.value);
    this.outputLanguage = event.target.value;
  }

  SelectInputLanguage(event: any) {
    this.inputLanguage = event.target.value;
  }

}
