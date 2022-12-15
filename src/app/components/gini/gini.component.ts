import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-gini',
  templateUrl: './gini.component.html',
  styleUrls: ['./gini.component.scss']
})
export class GiniComponent {

  data: Array<any> = [
    {egitim: false, yas: false, cinsiyet: true, kabul: true},
    {egitim: true, yas: true, cinsiyet: true, kabul: false},
    {egitim: false, yas: false, cinsiyet: false, kabul: true},
    {egitim: true, yas: true, cinsiyet: false, kabul: true},
    {egitim: true, yas: true, cinsiyet: true, kabul: true},
    {egitim: true, yas: false, cinsiyet: false, kabul: true},
    {egitim: true, yas: true, cinsiyet: true, kabul: true},
    {egitim: false, yas: true, cinsiyet: false, kabul: false},
    {egitim: false, yas: false, cinsiyet: false, kabul: true},
    {egitim: true, yas: false, cinsiyet: false, kabul: true},
    {egitim: true, yas: false, cinsiyet: false, kabul: true},
    {egitim: false, yas: true, cinsiyet: false, kabul: false}
  ];

  giniResults: Array<string> = [];
  giniResultsWithTables: Array<any> = [];

  //Form
  form = this.fb.group({
    egitim: ['', Validators.required],
    yas: ['', Validators.required],
    cinsiyet: ['', Validators.required],
    kabul: ['', Validators.required],
  })

  //Main Data Table
  displayedColumns: string[] = ['egitim', 'yas', 'cinsiyet', 'kabul'];
  dataSource = this.data;

  constructor (private fb: FormBuilder) {
  }

  addData () {
    const formValue = this.form.value;

    this.dataSource.push(formValue);
    this.dataSource = ([] as any[]).concat(this.dataSource);
    console.log(this.dataSource);

    this.form.reset();
  }

  gini() {
    let tempData = this.data;
    console.log(tempData);

    let i = 100;

    while (i > 0) {
      const giniTable = this.giniTable(tempData);
      const giniTotal = this.giniTotal(giniTable);
      const giniMin = this.giniMin(giniTotal);
      const directionToRemove = this.findDirectionToRemove(giniMin, giniTable);
      tempData = this.giniFixedData(tempData, directionToRemove);
      i--;
    }

  }

  giniTable(data: Array<any>): any {

    if(data.length == 0) return;

    let egitim: any = {
      trueToTrue: 0,
      trueToFalse: 0,
      falseToTrue: 0,
      falseToFalse: 0
    };
    let yas: any = {
      trueToTrue: 0,
      trueToFalse: 0,
      falseToTrue: 0,
      falseToFalse: 0
    };
    let cinsiyet: any = {
      trueToTrue: 0,
      trueToFalse: 0,
      falseToTrue: 0,
      falseToFalse: 0
    };

    data.forEach((el) => {
      if(el['egitim'] == true && el['kabul'] == true) {
        egitim.trueToTrue++;
      } else if (el['egitim'] == true && el['kabul'] == false) {
        egitim.trueToFalse++;
      } else if (el['egitim'] == false && el['kabul'] == true) {
        egitim.falseToTrue++;
      } else {
        egitim.falseToFalse++;
      }

      if(el['yas'] == true && el['kabul'] == true) {
        yas.trueToTrue++;
      } else if (el['yas'] == true && el['kabul'] == false) {
        yas.trueToFalse++;
      } else if (el['yas'] == false && el['kabul'] == true) {
        yas.falseToTrue++;
      } else {
        yas.falseToFalse++;
      }

      if(el['cinsiyet'] == true && el['kabul'] == true) {
        cinsiyet.trueToTrue++;
      } else if (el['cinsiyet'] == true && el['kabul'] == false) {
        cinsiyet.trueToFalse++;
      } else if (el['cinsiyet'] == false && el['kabul'] == true) {
        cinsiyet.falseToTrue++;
      } else {
        cinsiyet.falseToFalse++;
      }

    })

    console.log({
      totalDataRows: data.length,
      egitim,
      yas,
      cinsiyet,
    });

    return {
      totalDataRows: data.length,
      egitim,
      yas,
      cinsiyet,
    }
  }

  giniTotal(dataTable: any): any {

    if (dataTable == undefined) return;

    const egitimGiniTrueSide = 1 - (Math.pow((dataTable.egitim.trueToTrue / (dataTable.egitim.trueToTrue + dataTable.egitim.trueToFalse)), 2) + Math.pow((dataTable.egitim.trueToFalse / (dataTable.egitim.trueToTrue + dataTable.egitim.trueToFalse)), 2 ));
    const egitimGiniFalseSide = 1 - (Math.pow((dataTable.egitim.falseToTrue / (dataTable.egitim.falseToTrue + dataTable.egitim.falseToFalse)), 2) + Math.pow((dataTable.egitim.falseToFalse / (dataTable.egitim.falseToTrue + dataTable.egitim.falseToFalse)), 2 ));
    const egitimGiniTotal = (((dataTable.egitim.trueToTrue + dataTable.egitim.trueToFalse) * egitimGiniTrueSide) + ((dataTable.egitim.falseToTrue + dataTable.egitim.falseToFalse) * egitimGiniFalseSide)) / dataTable.totalDataRows;

    const yasGiniTrueSide = 1 - (Math.pow((dataTable.yas.trueToTrue / (dataTable.yas.trueToTrue + dataTable.yas.trueToFalse)), 2) + Math.pow((dataTable.yas.trueToFalse / (dataTable.yas.trueToTrue + dataTable.yas.trueToFalse)), 2 ));
    const yasGiniFalseSide = 1 - (Math.pow((dataTable.yas.falseToTrue / (dataTable.yas.falseToTrue + dataTable.yas.falseToFalse)), 2) + Math.pow((dataTable.yas.falseToFalse / (dataTable.yas.falseToTrue + dataTable.yas.falseToFalse)), 2 ));
    const yasGiniTotal = (((dataTable.yas.trueToTrue + dataTable.yas.trueToFalse) * yasGiniTrueSide) + ((dataTable.yas.falseToTrue + dataTable.yas.falseToFalse) * yasGiniFalseSide)) / dataTable.totalDataRows;

    const cinsiyetGiniTrueSide = 1 - (Math.pow((dataTable.cinsiyet.trueToTrue / (dataTable.cinsiyet.trueToTrue + dataTable.cinsiyet.trueToFalse)), 2) + Math.pow((dataTable.cinsiyet.trueToFalse / (dataTable.cinsiyet.trueToTrue + dataTable.cinsiyet.trueToFalse)), 2 ));
    const cinsiyetGiniFalseSide = 1 - (Math.pow((dataTable.cinsiyet.falseToTrue / (dataTable.cinsiyet.falseToTrue + dataTable.cinsiyet.falseToFalse)), 2) + Math.pow((dataTable.cinsiyet.falseToFalse / (dataTable.cinsiyet.falseToTrue + dataTable.cinsiyet.falseToFalse)), 2 ));
    const cinsiyetGiniTotal = (((dataTable.cinsiyet.trueToTrue + dataTable.cinsiyet.trueToFalse) * cinsiyetGiniTrueSide) + ((dataTable.cinsiyet.falseToTrue + dataTable.cinsiyet.falseToFalse) * cinsiyetGiniFalseSide)) / dataTable.totalDataRows;

    console.log({
      egitimGiniTotal,
      yasGiniTotal,
      cinsiyetGiniTotal,
    })

    if(isNaN(egitimGiniTotal) && isNaN(yasGiniTotal) && isNaN(cinsiyetGiniTotal)) {
      const endResult = 'Kalan veriler ile bir sonuca varamayız Gini Algoritması son bulur.';
      this.addResultToGiniResults(endResult, null);
      return;
    }

    return {
      egitimGiniTotal,
      yasGiniTotal,
      cinsiyetGiniTotal,
    }

  }

  giniMin(dataGiniTotal: any): any {

    if (dataGiniTotal == undefined) return;

    let giniMinData = {
      giniMin: '',
      value: 1
    };

    if (dataGiniTotal['egitimGiniTotal'] < giniMinData.value) {
      giniMinData = {
        giniMin: 'egitim',
        value: dataGiniTotal['cinsiyetGiniTotal']
      };
    }

    if (dataGiniTotal['yasGiniTotal'] < giniMinData.value) {
      giniMinData = {
        giniMin: 'yas',
        value: dataGiniTotal['yasGiniTotal']
      };
    }

    if (dataGiniTotal['cinsiyetGiniTotal'] < giniMinData.value) {
      giniMinData = {
        giniMin: 'cinsiyet',
        value: dataGiniTotal['cinsiyetGiniTotal']
      };
    }

    console.log(giniMinData);

    return giniMinData;
  }

  findDirectionToRemove(giniMin: any, giniTable: any): any {

    if (giniMin === undefined) return;

    const attribute = giniMin.giniMin;

    if (giniTable[attribute].trueToTrue == 0) {
      return {
        attribute,
        first: true,
        last: false
      }
    } else if (giniTable[attribute].trueToFalse == 0) {
      return {
        attribute,
        first: true,
        last: true
      }
    } else if (giniTable[attribute].falseToTrue == 0) {
      return {
        attribute,
        first: false,
        last: false
      }
    } else if (giniTable[attribute].falseToFalse == 0) {
      return {
        attribute,
        first: false,
        last: true
      }
    }

  }

  giniFixedData(data: Array<any>, remove: any): any {

    if (remove == undefined) return [];

    const fixedData = data.filter((el) => {
      return !(el[remove.attribute] == remove.first && el['kabul'] == remove.last);
    });

    const resultString = `${remove.attribute} = ${remove.first ? 'EVET' : 'HAYIR'} olan kişilerin hepsi ${remove.last ? 'sağlıklıdır.' : 'hastadır.'} ${fixedData.length <= 0 ? '' : 'Kalan kişiler içerisinden: '}`;


    this.addResultToGiniResults(resultString, fixedData);

    console.log(fixedData);
    return fixedData;
  }

  addResultToGiniResults(result: string, giniTable: any) {
    this.giniResults.push(result);
    this.giniResultsWithTables.push({
          text: result,
          table: giniTable
    })

    console.log(this.giniResultsWithTables);
  }
}