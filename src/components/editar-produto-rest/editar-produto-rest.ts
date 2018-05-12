import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProdutosProvider } from '../../providers/produtos/produtos';

@Component({
  selector: 'editar-produto-rest',
  templateUrl: 'editar-produto-rest.html'
})
export class EditarProdutoRestComponent {

  private formEditar: FormGroup;
  private idProduto: any;
  public loading: any;
  public resultGetOne: any;
  public resultEdit: any;

  constructor(
    public view: ViewController,
    public fb: FormBuilder,
    public produtos: ProdutosProvider,
    public navParams: NavParams,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    this.formEditar = fb.group({
      nome: [null, [Validators.required]],
      marca: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      quantidade: [null, [Validators.required]]
    })
  }
  ionViewDidLoad() {
    this.idProduto = this.navParams.get('id')
    this.getOneProduto()
  }
  getOneProduto(){
    this.showLoader()
    this.produtos.getOneProduto(this.idProduto).then((res)=>{
      this.resultGetOne = res
      this.formEditar.setValue({
        nome: this.resultGetOne.nome,
        marca: this.resultGetOne.marca,
        valor: this.resultGetOne.valor,
        quantidade: this.resultGetOne.quantidade
      })
      this.loading.dismiss()
    })
  }
  concluir(){
    this.showLoader();
    this.produtos.alterarProdutos(this.idProduto, this.formEditar.value).then((res)=>{
      this.resultEdit = res
      this.loading.dismiss()
      this.mostraMenssagem(this.resultEdit.message, 2500)
      this.view.dismiss();
    })
  }
  closeModal(){
    this.view.dismiss();
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    this.loading.present();
  }
  mostraMenssagem(message: string, duration?: number) {
    let menssagem = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    menssagem.present();
  }
}
