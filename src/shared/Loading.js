import React from "react";
import {Box, CircularProgress} from "@material-ui/core";

export default function Loading({message}) {
    return (
        <Box m={2} ml={0} mr={0} display={'flex'} gridGap={16} alignItems={'center'}>
            <CircularProgress color={'primary'} size={16}/> {message ? message : 'Loading...'}
        </Box>
    )
}