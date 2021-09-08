import {Box, Typography} from "@material-ui/core";
import React from "react";

export default function Title({title, subTitle}) {
    return (
        <Box ml={0.5}>
            <Typography variant={'h5'} color={'textSecondary'}>
                {title}
            </Typography>
            <Typography variant={'subtitle1'} color={'textSecondary'}>
                {subTitle}
            </Typography>
        </Box>
    )
}