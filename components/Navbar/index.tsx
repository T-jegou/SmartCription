import { Container, Group } from "@mantine/core";
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
              
            />Smartcription {process.env.PUBLIC_URL}</h1>
            </div>
                <SelectWalletModal/>
            </Group>
        </Container>
    );
}