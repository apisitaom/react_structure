import Swal, { SweetAlertIcon } from "sweetalert2";
import { i18n } from "../../i18n";

export const AlertTitle = {
  Success: i18n("common.Success"),
  Warning: i18n("common.Warning"),
  Error: i18n("common.Error"),
  Info: i18n("common.Info"),
  Confirm: i18n("common.confirm"),
  Hint: i18n("common.Hint"),
  Duplicate: i18n("common.Duplicate"),
};

export const AlertMsg = {
  SaveComplete: i18n("common.SaveComplete"),
  DeleteComplete: i18n("common.DeleteComplete"),
  Error: i18n("common.Error"),
  ConfirmSave: i18n("common.ConfirmSave"),
  ConfirmSaveDraft: i18n("common.confirmDraft"),
  ConfirmDelete: i18n("common.ConfirmDelete"),
  ConfirmApprove: i18n("common.confirmApprove"),
  ConfirmSubmit: i18n("common.confirmSubmit"),
  ConfirmReject: i18n("common.confirmReject"),
  ConfirmCancel: i18n("common.ConfirmCancel"),
  NoPermission: i18n("common.NoPermission"),
  SessionTimeOut: i18n("common.SessionTimeOut"),
  DeleteFail: i18n("common.DeleteFail"),
  UploadImage: i18n("common.UploadImage"),
};

export const AlertIcon = {
  info: "info" as SweetAlertIcon,
  success: "success" as SweetAlertIcon,
  error: "error" as SweetAlertIcon,
  warning: "warning" as SweetAlertIcon,
  question: "question" as SweetAlertIcon,
};

export const AlertButtonText = {
  OK: i18n("common.ok"),
  Cancel: i18n("common.cancel"),
  Close: i18n("common.close"),
  Yes: i18n("common.yes"),
};

function GetMessage(text: string) {
  return i18n(`common.${text}`);
}

export const DialogConfirm = (funcYes: Function, funcNo?: Function) => {
  SwAlert.Confirm(AlertTitle.Confirm, AlertMsg.ConfirmSave, funcYes, funcNo);
};

export const DialogConfirmOtherMessage = (
  sTitle: string,
  sMessage: string,
  funcYes: Function,
  funcNo?: Function
) => {
  SwAlert.Confirm(GetMessage(sTitle), GetMessage(sMessage), funcYes, funcNo);
};

export const DialogConfirmDelete = (funcYes: any, funcNo?: any) => {
  SwAlert.Confirm(AlertTitle.Confirm, AlertMsg.ConfirmDelete, funcYes, funcNo);
};

export const SwAlert = {
  Common: (sTitle: string, sMessage: string, fnOK?: Function) => {
    Swal.fire({
      title: !sTitle ? "" : sTitle + "",
      html: "<b>" + sMessage + "</b>",
      confirmButtonText: AlertButtonText.Close,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.value) {
        if (fnOK) fnOK();
      }
    });
  },
  Info: (sTitle: string, sMessage: string, fnOK?: Function) => {
    Swal.fire({
      title: !sTitle ? AlertTitle.Success : sTitle + "",
      html: "<b>" + sMessage + "</b>",
      icon: AlertIcon.info,
      confirmButtonText: AlertButtonText.Close,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.value) {
        if (fnOK) {
          fnOK();
        } else {
          Swal.close();
        }
      }
    });
  },
  Success: (sTitle: string, sMessage: string, fnOK?: Function) => {
    Swal.fire({
      title: !sTitle ? AlertTitle.Success : sTitle + "",
      html: "<b>" + sMessage + "</b>",
      icon: AlertIcon.success,
      confirmButtonText: AlertButtonText.Close,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.value) {
        if (fnOK) {
          fnOK();
        } else {
          Swal.close();
        }
      }
    });
  },
  Error: (sTitle: string, sMessage: string, fnOK?: Function) => {
    Swal.fire({
      icon: AlertIcon.error,
      title: !sTitle ? AlertTitle.Error : sTitle + "",
      html: "<b>" + sMessage + "</b>",
      confirmButtonText: AlertButtonText.Close,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.value) {
        if (fnOK) {
          fnOK();
        } else {
          Swal.close();
        }
      }
    });
  },
  Warning: (sTitle: string, sMessage: string, fnOK?: Function) => {
    Swal.fire({
      icon: AlertIcon.warning,
      title: !sTitle ? AlertTitle.Warning : sTitle + "",
      html: "<b>" + sMessage + "</b>",
      confirmButtonText: AlertButtonText.Close,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.value) {
        if (fnOK) {
          fnOK();
        } else {
          Swal.close();
        }
      }
    });
  },
  Confirm: (
    sTitle: string,
    sMessage: string,
    fnYes?: Function,
    fnNo?: Function
  ) => {
    Swal.fire({
      title: sTitle,
      html: "<b>" + sMessage + "</b>",
      icon: AlertIcon.question,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: AlertButtonText.OK,
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: () => {
        return new Promise(() => {
          //resolve, reject
          Swal.showLoading();

          if (fnYes) {
            fnYes();
            Swal.close();
          } else {
            Swal.close();
          }
        });
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        if (fnNo) {
          fnNo();
          Swal.close();
        } else {
          Swal.close();
        }
      }
    });
  },
  ConfirmYN: (
    sTitle: string,
    sMessage: string,
    fnYes?: Function,
    fnNo?: Function
  ) => {
    Swal.fire({
      title: !sTitle ? AlertTitle.Confirm : sTitle + "",
      html: "<b>" + sMessage + "</b>",
      icon: AlertIcon.question,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      // closeOnConfirm: false,
      // closeOnCancel: false
    }).then((result) => {
      if (result.value) {
        if (fnYes) fnYes();
        else Swal.close();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        if (fnNo) fnNo();
        else Swal.close();
      }
    });
  },
};
