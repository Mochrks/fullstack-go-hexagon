
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'

interface ConfirmDialogProps {
    IsConfirmModalOpen: boolean,
    setIsConfirmModalOpen: (open: boolean) => void;
    handleActionDelete?: () => void
}

export const ConfirmDialog = ({ IsConfirmModalOpen, setIsConfirmModalOpen, handleActionDelete }: ConfirmDialogProps) => {
    return (
        <div>
            <Dialog open={IsConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this item?
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className='flex gap-3 md:gap-1'>
                        <Button type="submit" onClick={() => handleActionDelete && handleActionDelete()}>Delete</Button>
                        <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>Cancel</Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </div>
    )
}