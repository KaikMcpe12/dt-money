import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionFormSchema = z.object({
  description: z.string().min(3).max(100),
  price: z.number().min(0),
  category: z.string().min(3).max(100),
  type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income'
    }
  })
  
  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(data);
  }
  
  return (
    <Dialog.Portal> 
     {/* faz com que o seu conteúdo seja colocado de forma separada de seu componente pai ou pertencente a outro componente */}
      <Overlay /> 
      {/* fundo preto*/}
      
      <Content>
        <Dialog.Title>
          Nova Transação
        </Dialog.Title>
        
        <CloseButton >
          <X size={24} />
        </CloseButton>
        
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input 
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          
          <input 
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />
          
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24}  />
                    Entrada
                  </TransactionTypeButton>
                  
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24}  />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />
          
          <button type="submit" disabled={isSubmitting}>Cadastrar</button>
        </form>
        
      </Content>
    </Dialog.Portal>
  )
}
