import './index.css'
import 'tailwindcss/tailwind.css';
import RadioButtonTimer from './components/ui/RadiobuttonTimer';

function App() {

  return (
    <div className="flex flex-col h-screen">
      <header className="py-4">
        <div className="container flex items-center px-4 md:px-6">
          <h3 className="flex items-center space-x-2 text-lg font-medium">
            <span>WROUTINE</span>
          </h3>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="grid items-center gap-4 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">Ready to start your routine?</h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Your timer will start once you press the button. Get ready to focus!
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <RadioButtonTimer />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
