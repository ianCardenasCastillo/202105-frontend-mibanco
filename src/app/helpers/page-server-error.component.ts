
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-error-message',
    template: `
    <style>
        .full-screen {
            // background-color: rgb(51, 51, 51);
            width: 100vw;
            height: 100vh;
            color: white;
            font-family: 'Arial Black';
            text-align: center;
        }
        .container {
            padding-top: 4em;
            width: 50%;
            display: block;
            margin: 0 auto;
        }
        .error-num {
            color: #000000;
            font-size: 8em;
        }
        .italic {
            font-style: italic;
        }
        p {
            color: #000000;
            margin-bottom: 4em;
        }
        a {
            color: #000000;
            text-decoration: none;
            text-transform: uppercase;
            &:hover {
                color: lightgray;
            }
        }
    }
    </style>
    <div class="full-screen">
      <div class='container'>
        <span class="error-num">5</span>
        <span class="error-num">0</span>
        <span class="error-num">0</span>
        <p class="sub-text">Algo salió mal. Estamos trabajando para solucionarlo.</p>
        <p class="sub-test">{{message}}</p>
        <a href="/">Go back</a>
      </div>
    </div>
    `
})
export class PageServerErrorComponent {
    @Input() message = '';
}
