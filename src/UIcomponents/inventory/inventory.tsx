import React, { useCallback, useEffect, useState } from 'react';
import { MenuItem, Modal, Select, SelectChangeEvent } from '@mui/material';

import { ScreenSelectorProps } from '../../screens/types';
import { useStyles } from '../settings/styles';

interface InventoryProps {
    screenSelectorProps: ScreenSelectorProps;
}

export const Inventory = (props: InventoryProps) => {
    const styles = useStyles();
    const [openInventory, setOpenInventor] = useState(false);

    return <div>
        <div onClick={() => setOpenInventor(true)}>Open inventory</div>
        <Modal open={openInventory}>
            <div className={styles.module}>
                <div onClick={() => setOpenInventor(false)}>close inventory</div>
            </div>
        </Modal>
    </div>;
};
