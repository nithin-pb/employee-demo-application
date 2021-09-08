import {TextField} from "@material-ui/core";

export default function CustomTextField(props) {
    return <TextField {...props} variant={'outlined'} color={'primary'} fullWidth/>
}