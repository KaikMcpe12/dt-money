import { HeaderContainer, HeaderContent, NewTransactioButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from "../NewTransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        
        <Dialog.Root>
          <Dialog.Trigger asChild>
            {/* asChild faz com que não crie um novo botão, mas reutilize o já existente */}
            <NewTransactioButton>Nova Transação</NewTransactioButton>
          </Dialog.Trigger>
          
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}