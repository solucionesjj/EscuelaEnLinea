import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

declare var $: any;

@Component({
  selector: 'app-report-card-config',
  templateUrl: './report-card-config.component.html',
  styleUrls: ['./report-card-config.component.css']
})
export class ReportCardConfigComponent implements OnInit {

  // public HeaderCKEditor = ClassicEditor;
  // public BodyCKEditor = ClassicEditor;
  // public FooterCKEditor = ClassicEditor;

  reportCardModelList: any = [];
  newModelName: string = '';
  idReportCardModelSelected: string = '0';



selectedModel: any = {};

constructor(private crudService: CrudService) {
  this.idReportCardModelSelected = '0';
  this.getReportCardConfigList();
}

//   public onReady( editor ) {
//     editor.ui.getEditableElement().parentElement.insertBefore(
//         editor.ui.view.toolbar.element,
//         editor.ui.getEditableElement()
//     );
// }

ngOnInit() {
}

async saveModel() {
  this.crudService.model = 'ReportCardModels';
  if (parseInt(this.idReportCardModelSelected) > 0) {

    const modelObject = {
      id: this.idReportCardModelSelected,
      // header: this.quillEditorObjectHeader.root.innerHTML,
      // body: this.quillEditorObjectBody.root.innerHTML,
      // footer: this.quillEditorObjectFooter.root.innerHTML
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
  // console.log($('#HeaderCKEditorId'))
  // this.HeaderCKEditor.setData('');
  // this.BodyCKEditor.setData('');
  // this.FooterCKEditor.setData('');

  if (parseInt(this.idReportCardModelSelected) > 0) {
    this.crudService.model = 'ReportCardModels';
    const searchCriteria = `{"where":{"id":"` + this.idReportCardModelSelected + `"}}`;
    const result = await this.crudService.getSearch(searchCriteria);
    if (result.result) {
      // this.selectedModel = result.data[0];
      // this.HeaderCKEditor.setData(this.selectedModel.header);
      // this.BodyCKEditor.setData(this.selectedModel.body);
      // this.FooterCKEditor.setData(this.selectedModel.footer);
    } else {
      this.selectedModel = {};
      // this.HeaderCKEditor.setData('');
      // this.BodyCKEditor.setData('');
      // this.FooterCKEditor.setData('');
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
  // this.addText(this.quillEditorObjectHeader, '[section.var]')
  // this.insertTable(this.quillEditorObjectHeader,6,6)
}

addText(editor: any, text: string) {
  const index = editor.getSelection().index;
  const source = 'user';
  editor.insertText(index, ' ' + text + ' ', source);
  editor.setSelection(index + text.length + 2);

}

insertTable(editor: any, x: number, y: number) {
  let htmlTable = `<table width="100%">`;
  if (x > 0 && y > 0) {
    for (let rows = 0; rows < x; rows++) {
      htmlTable = htmlTable + '<tr>';
      for (let rows = 0; rows < x; rows++) {
        htmlTable = htmlTable + `<td>Datos!!</td>`
      }
      htmlTable = htmlTable + '</tr>';
    }
  }
  htmlTable = htmlTable + `</table>`;
  editor.pasteHTML(htmlTable);
  //editor.pasteHTML(`<br><br>`);
}



}
