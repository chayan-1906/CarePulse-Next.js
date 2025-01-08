import Image from "next/image";
import {ButtonProps} from "@/types";
import {Button} from "@/components/ui/button";

function SubmitButton({isLoading, loadingText, className, children}: ButtonProps) {
    return (
        <Button type={'submit'} disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
            {isLoading ? (
                <div className={'flex items-center gap-4'}>
                    <Image src={'/assets/icons/loader.svg'} alt={'loader'} width={24} height={24} className={'animate-spin'}/>
                    {loadingText || 'Loading...'}
                </div>
            ) : (
                children
            )}
        </Button>
    );
}

export default SubmitButton;