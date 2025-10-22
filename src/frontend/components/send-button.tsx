import { LoaderCircle, Send } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from './ui/input';
import useSuiAddress from '@/hooks/useSuiAddress';
import SendConfirmation from './send-confirmation';
import useSendSui from '@/hooks/useSendSui';

export default function SendButton() {
  const { isPending: isFetchingAddress } = useSuiAddress();
  const {
    mutate: sendSui,
    isPending: isSending,
    isError,
    data: sendResult,
    isIdle,
    reset,
  } = useSendSui();

  if (isError) {
    console.error(sendResult);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendSui({
      to: event.currentTarget.toAddress.value,
      amount: event.currentTarget.amount.value,
    });
  };

  return (
    <Dialog onOpenChange={reset}>
      <DialogTrigger asChild>
        <Button
          disabled={isFetchingAddress}
          className="flex flex-col h-30 w-full items-start gap-1"
        >
          <Send className="w-5 h-5" />
          Send
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Send</DialogTitle>
        </DialogHeader>
        {(isIdle || isSending) && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="To SUI address"
              name="toAddress"
              data-1p-ignore
            />
            <Input
              type="text"
              placeholder="Amount in MIST"
              name="amount"
              data-1p-ignore
            />
            <Button disabled={isSending} type="submit">
              {isSending ? (
                <>
                  <LoaderCircle className="animate-spin w-4 h-4 mr-1" />
                  Sending ...
                </>
              ) : (
                'Send'
              )}
            </Button>
          </form>
        )}
        {isError && (
          <div className="bg-destructive/30 rounded-lg p-2 text-destructive-foreground">
            There was an error sending SUI, see browser console for details.
          </div>
        )}
        {sendResult && 'digest' in sendResult &&
          <SendConfirmation txId={sendResult.digest} />
        }
      </DialogContent>
    </Dialog>
  );
}
