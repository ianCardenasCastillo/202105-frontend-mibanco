import { Component } from '@angular/core';

@Component({
    template: `
    <div class="div-title-page">
        <h1 class="h1-title-page">La pagina que buscas no se encuentra aquí!</h1>
    </div>
    <div style="margin-top: 25px; text-align: right; margin-left: auto; margin-right: auto; background:#ecedf1;">
        <img src="assets/img/404.jpg">
    </div>
    `
})
export class PageNotFoundComponent { }
