import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./default-modal.component.scss')],
  templateUrl: './default-modal.component.html'
})

export class DefaultModal implements OnInit {

  modalHeader: string;
  modalContent: string = `“Los datos personales y sensibles que los usuarios proporcionen al momento de su ingreso y/o registro al Sitio tienen como finalidad el crear un expediente y facilitar el acceso a su cuenta, así como a su configuración, como el cargar y descargar videos, fotos, sonidos, etc. La recopilación de datos se llevará a cabo única y exclusivamente a través de los formularios publicados en la web y de aquellos existentes de forma física en las oficinas de AvancExpress y se podrán verificar vía telefónica o por medios electrónicos. En caso de no contar con los datos señalados, AvancExpress no estaría en posibilidad de proporcionar su servicio, ya que los datos que se solicitan son indispensables para dar acceso y uso a la página web., (i) con previo consentimiento del usuario, podrá compartir y/o proporcionar la información financiera, comercial, operativa y personal del Usuario, así como la relativa a cualquier actividad que se promueve en el Sitio; y (ii) autoriza para que su información pueda ser utilizada por AvancExpress con fines mercadotécnicos y/o publicitarios, o para cumplimentar con las obligaciones contractuales contraídas con el usuario. El ingreso y/o registro a través del Sitio implica el consentimiento pleno y sin reservas de los usuarios para el tratamiento de sus datos personales de acuerdo con el presente Aviso de Privacidad.
  AvancExpress cuenta con medidas físicas, técnicas y administrativas de seguridad para la protección de Datos Personales proporcionados por los usuarios.
  En cumplimiento a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, AvancExpress ofrece el siguiente medio de contacto, y el siguiente procedimiento, para acceder, rectificar, cancelar u oponer (ARCO) sus datos personales:
  Acceso (A) y Rectificación (R): Para acceder a su información, el usuario deberá ingresar al Sitio, dar clic en “Iniciar Sesión” y llenar sus datos con los cuales registró su cuenta. Los datos podrá verlos en su panel de control, y específicamente en la sección “Mi Cuenta”, en la parte superior derecha de la pantalla. El usuario podrá rectificar sus datos personales en esta misma sección. AvancExpress se reserva el derecho de verificar la veracidad de la información antes de realizar o autorizar el cambio. Cualquier duda sobre este procedimiento, favor de enviar un correo electrónico a _______________ o llamar al ___________ y LADA sin costo al _____________
  Cancelación (C) y Oposición (O): El usuario tiene la facultad de eliminar su información en forma directa. Para ello, deberá ingresar a su cuenta en la dirección www.____________.com, y elegir la opción "Mi Cuenta" en el menú de la parte _________ de su panel. En la parte __________, deberá dar clic en "Eliminar Cuenta" y confirmar la eliminación con la contraseña que creó al registrarse. Los usuarios que tengan una relación jurídica con AvancExpress, como créditos activos o saldo en su cuenta de prestatario, no podrán eliminar su cuenta. AvancExpress podrá mantener información sobre la actividad del usuario en el portal para fines estadísticos, sin que esto suponga la retención de datos de identificación, documentos, o información sensible. AvancExpress se reserva la posibilidad de mantener datos requeridos para ejercer sus políticas de negocio, como evitar que solicitantes de crédito completen una nueva solicitud en menos de 6 meses si la solicitud original ha sido rechazada.”`;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }
}
