import { useState } from 'react';
import { Modal, Button, Stack, Text } from '@mantine/core';
import { useWeb3React } from "@web3-react/core";
import { IconAppWindow } from '@tabler/icons';

//Wallet components
import WalletConnectButtonGroup from '@components/wallet/WalletConnectButtonGroup';
import WalletWarningTab from '@components/wallet/WalletWarningTab';

export default function SelectWalletModal() {
    const [opened, setOpened] = useState(false);
    const { active, account } = useWeb3React()

    return (
        <>
            <Modal
                opened={opened && !active}
                onClose={() => setOpened(false)}
                title="Select Wallet"
                overlayOpacity={0.55}
                overlayBlur={0.3}
                size="md"
                sx={() => ({
                    fontWeight: 600,
                    fontSize: 16,
                })}
            >
                <Stack>
                    <WalletConnectButtonGroup />
                    <WalletWarningTab />
                </Stack>
            </Modal>
            <Button className='button-connect-app' rightIcon={<IconAppWindow />} styles={(theme) => ({
                root: {
                    borderRadius: theme.radius.md,
                    width: '220px',
                    backgroundColor: theme.colors.blue,
                },
            })}
                size="md" onClick={() => active ? undefined : setOpened(true)}>
                {active ?
                    <Text>
                        {account ? account.slice(0, 6) + "..." + account.slice(account.length - 4, account.length) : "Connect"}
                    </Text>
                    :
                    "Connect App"
                }
            </Button>
        </>
    );
}