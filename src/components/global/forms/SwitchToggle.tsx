import { Switch } from '@headlessui/react'

function SwitchToggle({enabled,setEnabled,isImageGenerating}:any) {
  

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      disabled={isImageGenerating}
      className={`${
        enabled ? 'bg-[#30C5D2]' : 'bg-blackPearl'
      } relative inline-flex h-6 w-10 items-center rounded-full
      ${isImageGenerating ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-[#30C5D2]"} 
      `}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? 'translate-x-[1.125rem]' : 'translate-x-[0.1rem]'
        } inline-block h-5 w-5 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}
export default SwitchToggle
