import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const ButtonPersonalizado = styled(Button)({
    backgroundColor: '#1a6660',
    '&:hover':{
        backgroundColor: '#1d837a',
    }
});

const BasicButtons = ({text}) => {
    return (
        <Stack direction="row">
            <ButtonPersonalizado variant="contained">
                {text}
            </ButtonPersonalizado>
        </Stack>
    );
}

export default BasicButtons;

