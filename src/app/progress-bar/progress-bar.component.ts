import {  OnDestroy, OnInit } from '@angular/core';


//------------------chip auto ------
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass']
})
export class ProgressBarComponent implements OnInit, OnDestroy {

  progressWidth: number = 0;
  private interval: any;

  public selectedOption:string = 'option1';
  isChecked1: boolean = true; // Set the initial checked state to true
  isChecked2: boolean = false;
  isChecked3: boolean = false;


  //------chip 
  chipInput: string = '';
  selectedChips: string[] = [];
  allChips: string[] = ['Apple', 'Banana', 'Cherry', 'Date'];
  filteredOptions: Observable<string[]>;



  constructor() {
    this.filteredOptions = this.chipControl.valueChanges.pipe(
      startWith(null),
      map((chip: string | null) => chip ? this._filter(chip) : this.allChips.slice())
    );
  }

  chipControl = new FormControl();

  ///---------end chip variable

  ngOnInit() {
    this.progressWidth = 0;
    this.startProgressBar();
  }

  startProgressBar() {
    this.interval = setInterval(() => {
      const pageWidth = window.innerWidth;
      const progressBarWidth = 300;

      if (progressBarWidth >= pageWidth) {
        this.stopProgressBar();
      } else {
        this.progressWidth += 1;
      }
    }, 1000);
  }

  stopProgressBar() {
    clearInterval(this.interval);
  }

  onRadioChange(option:string,event:object){
    console.log(event);
    this.selectedOption = option

    if(this.isChecked1){
      this.isChecked2 = false;
    } if(this.isChecked2) {
      this.isChecked1 = false
    }

   
    
  }



  onRadioChange1() {
  }

  checkRadioButton() {
    this.isChecked3 = true;
  }

  uncheckRadioButton() {
    this.isChecked3 = false;
  }

  toggeleRadioButton(){
    if(this.isChecked1 || this.isChecked2){
      this.isChecked1 = false
      this.isChecked2 = false

    } else{
      this.isChecked1 = true
    }
  }







  ngOnDestroy() {
    this.stopProgressBar();
  }




  /// chip


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allChips.filter(chip => chip.toLowerCase().includes(filterValue));
  }

  addChip(event: any): void {
    const value = event.option.viewValue;
    if (!this.selectedChips.includes(value)) {
      this.selectedChips.push(value);
    }
    this.chipInput = '';
    this.chipControl.setValue(null);
  }

  removeChip(chip: string): void {
    const index = this.selectedChips.indexOf(chip);
    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    }
  }

}
