import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { FormGroup, FormControl } from '@angular/forms';

declare var $: any;
declare var Quill: any;

@Component({
  selector: 'app-report-card-config',
  templateUrl: './report-card-config.component.html',
  styleUrls: ['./report-card-config.component.css']
})
export class ReportCardConfigComponent implements OnInit {

  reportCardModelList: any = [];
  newModelName: string = '';
  idReportCardModelSelected: string = '0';

  selectedModel: any = {};

  editorFormHeader: FormGroup;
  editorFormBody: FormGroup;
  editorFormFooter: FormGroup;

  editorHeaderStyle = {
    height: '200px'
  }

  editorBodyStyle = {
    height: '200px'
  }

  editorFooterStyle = {
    height: '200px'
  }

  editorHeaderConfig: any = {};
  editorBodyConfig: any = {};
  editorFooterConfig: any = {};


  constructor(private crudService: CrudService) {

    this.editorHeaderConfig = {
      toolbar: [
        ['italic', 'bold', 'underline', 'strike'],        // toggled buttons
        //['blockquote', 'code-block'],
        //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        //[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction
        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
      ]
    };

    this.editorBodyConfig = {
      toolbar: [
        ['italic', 'bold', 'underline', 'strike'],        // toggled buttons
        //['blockquote', 'code-block'],
        //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        //[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction
        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
      ]
    };

    this.editorFooterConfig = {
      toolbar: [
        ['italic', 'bold', 'underline', 'strike'],        // toggled buttons
        //['blockquote', 'code-block'],
        //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        //[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction
        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
      ]
    };

    this.idReportCardModelSelected = '0';
    this.getReportCardConfigList();
  }

  quillEditor: any = {};

  ngOnInit() {

     this.quillEditor = new Quill('#editor', {
      theme: 'snow'
    });



    this.editorFormHeader = new FormGroup(
      { 'headerEditor': new FormControl(null) }
    );
    this.editorFormBody = new FormGroup(
      { 'bodyEditor': new FormControl(null) }
    );
    this.editorFormFooter = new FormGroup(
      { 'footerEditor': new FormControl(null) }
    );
  }

  async saveModel() {
    this.crudService.model = 'ReportCardModels';
    if (parseInt(this.idReportCardModelSelected) > 0) {

      const modelObject = {
        id: this.idReportCardModelSelected,
        header: this.editorFormHeader.get('headerEditor').value,
        body: this.editorFormBody.get('bodyEditor').value,
        footer: this.editorFormFooter.get('footerEditor').value
      };
      const result = await this.crudService.update(modelObject);
      if (result.result) {
        //Datos actualizados correctamente.
        alert('Modelo actualizado correctamente.');
      } else {
        alert('Error al guardar los datos.');
        console.log(result);
      }
    } else {
      alert('Por favor seleccione un modelo');
    }
  }

  async selectModel() {
    if (parseInt(this.idReportCardModelSelected) > 0) {
      this.crudService.model = 'ReportCardModels';
      const searchCriteria = `{"where":{"id":"` + this.idReportCardModelSelected + `"}}`;
      const result = await this.crudService.getSearch(searchCriteria);
      if (result.result) {
        this.selectedModel = result.data[0];
        this.editorFormHeader.controls['headerEditor'].setValue(this.selectedModel.header);
        this.editorFormBody.controls['bodyEditor'].setValue(this.selectedModel.body);
        this.editorFormFooter.controls['footerEditor'].setValue(this.selectedModel.footer);
      } else {
        this.selectedModel = {};
        this.editorFormHeader.controls['headerEditor'].setValue(null);
        this.editorFormBody.controls['bodyEditor'].setValue(null);
        this.editorFormFooter.controls['footerEditor'].setValue(null);
        alert('Error al consultar el modelo')
        console.log(result)
      }
    } else {
      alert('Por favor seleccione un modelo para editar.')
    }
  }

  async getReportCardConfigList() {
    this.crudService.model = 'ReportCardModels';
    const sqlQuery = 'select id, name from ReportCardModels order by name';
    const result = await this.crudService.getDynamicQuery(sqlQuery);
    if (result.result) {
      if (result.data.length > 0) {
        result.data.forEach(model => {
          this.reportCardModelList.push({ value: model.id, text: model.name })
        });
      }
    }
  }

  async createModel() {
    if (this.newModelName != '') {
      const ReportCardModelObject = { name: this.newModelName };
      this.crudService.model = 'ReportCardModels';
      const result = await this.crudService.add(ReportCardModelObject);
      if (result.result) {
        this.getReportCardConfigList();
      } else {
        alert('Error al crear el nuevo modelo.')
        console.log(result)
      }
    } else {
      alert('Por favor escriba un nombre para el nuevo modelo.')
    }
  }

  add() {
    this.addText(this.editorFormHeader.controls['headerEditor'], '[section.var]')

  }

  addText(editor: any, text: string) {
    const index = this.quillEditor.getSelection().index;
    const source = 'user';
    this.quillEditor.insertText(index, text, source);
  }





}
