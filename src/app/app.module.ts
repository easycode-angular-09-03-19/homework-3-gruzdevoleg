import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//импортируем имеющиеся компоненты
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';

//декоратор, принимающий объект
@NgModule({
  declarations: [//регистрируем все компоненты
    AppComponent,
    CarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],//сюда передаются сервисы
  bootstrap: [AppComponent]//сюда только базовая компонента
})
export class AppModule { }
