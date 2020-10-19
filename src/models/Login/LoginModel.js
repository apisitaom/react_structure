import { i18n } from '.././../i18n';
import StringField from '../../components/Fields/StringField';
import IdField from '../../components/Fields/IdField';

function label(name) {
   return i18n(`entities.login.fields.${name}`);
} 

const fields = {
    id: new IdField("id", "id"),
    userId: new StringField("userId", label("userId"), {required: true}),
    password: new StringField("password", label("password"), {required: true})
}

export default fields;