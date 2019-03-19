import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car',//селектор элемента, в который будет вставляться разметка компонента
  //этот элемент может находиться в html другой компоненты или в корневом index.html
  templateUrl: './car.component.html',//путь к файлу с разметкой компонента
  styleUrls: ['./car.component.css']//путь к файлу стилей компонента 
})

export class CarComponent {
  	public isFuelEmpty = false;
  	public startMileage;
  	public addMileage;
  	public resultMessage;
    public carInfo = {
	  	name: 'BMW',
	  	volume: 100,
	  	totalMileage: 10000,
	  	currentGasoline: 50,
	  	data: ['Двигатель 2 л', 'Макс. скорость 250 км/ч', 'ABS', 'Цвет серый', 'Расход топлива 10 л/100км']
	}

  	constructor() {}

	public drive(): void {
		this.startMileage = this.carInfo.totalMileage;
		this.addMileage = +prompt('Введите пробег');

		/**
		* Проверим не пустой ли бак
		*
		*/
		if (this.carInfo.currentGasoline === 0) {
			this.isFuelEmpty = !this.isFuelEmpty;
			this.carInfo.currentGasoline = 0;
			this.resultMessage = 'Бак пуст!';
			return;
		}

		/**
		*Проверим введенный пробег
		*
		*/
		if (this.addMileage < 0 || typeof this.addMileage !== 'number') {
			this.resultMessage = 'Введите корректный пробег';
			return;
		}
		
		/**проверим хватит ли бензина в баке на желаемый пробег
		*  Если нет, то проедем сколько позволяет бак.
		* Если топлива достаточно, едем до конца
		*/
		if (this.carInfo.currentGasoline <= this.addMileage/10) {
			this.addMileage = this.carInfo.currentGasoline*10;
			this.carInfo.totalMileage += this.addMileage;
			this.carInfo.currentGasoline -= Math.round(this.addMileage/10);
			this.resultMessage = `Вам хватило топлива только на ${this.carInfo.totalMileage - this.startMileage} км. Бак пуст! Необходима заправка`;
			this.isFuelEmpty = !this.isFuelEmpty;
			return;
		}

		//увеличиваем пробег и уменьшаем кол-во бензина в баке
		this.carInfo.totalMileage += this.addMileage;
		this.carInfo.currentGasoline -= Math.round(this.addMileage/10);

		//проверяем осталось ли топливо в баке после поездки
		if (this.carInfo.currentGasoline <= 0) {
			this.isFuelEmpty = !this.isFuelEmpty;
			this.carInfo.currentGasoline = 0;
			this.resultMessage = 'Бак пуст!';
			return;
		} 
		this.resultMessage = `Можем ехать!`;
	}

	public refuel(): string | void {
		let addGasoline = +prompt('Сколько бензина залить?');
		
		if (addGasoline < 0 || typeof addGasoline !== 'number') {
			this.resultMessage = 'Не сливайте бензин!';
			return;
		}
		this.carInfo.currentGasoline += addGasoline;
		this.isFuelEmpty = false;
		//проверим влезет ли весь заливаемый бензин в бак
		if (this.carInfo.currentGasoline > this.carInfo.volume) {
			this.carInfo.currentGasoline = 100;
		}
		this.resultMessage = `Можем ехать!`;
	}
 }