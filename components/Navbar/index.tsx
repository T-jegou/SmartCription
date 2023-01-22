import { Container, Group } from "@mantine/core";
import SelectWalletModal from "@components/wallet/ModalConnect"
import { useWeb3React } from "@web3-react/core"

export default function Navbar() {
    
    return (
        <Container pb={0} fluid={true}>
            <Group position="apart" sx={{ height: '100%' }}>
                <h1>Smartcription</h1>
                <SelectWalletModal/>
            </Group>
        </Container>
    );
}