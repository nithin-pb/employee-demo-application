import {Button} from "@material-ui/core";

export default function CustomButton(props) {
    return <Button {...props} variant={'contained'} disableElevation/>
}