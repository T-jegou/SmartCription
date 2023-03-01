import { Button, Container, Group } from "@mantine/core";
import SelectWalletModal from "@components/wallet/ModalConnect"
import { useWeb3React } from "@web3-react/core"
import Icon from '@mdi/react';
import { mdiAmbulance } from '@mdi/js';

export default function Navbar() {
    
    return (
        <Container pb={0} fluid={true}>
            <Group position="apart" sx={{ height: '100%' }}>
            <div>
            
            <h1>
                <Icon className="logo" path={mdiAmbulance}
                size={1.5}
                color="#684DEC"
            />Smartcription</h1>
            </div>

            <div>
                <SelectWalletModal/>
                <button className="toolbar-buttons" type="submit" >Home</button>
                <button className="toolbar-buttons" type="submit" >About us</button>
            </div>
            </Group>
        </Container>
    );
}