import { Code2, ListVideo, Settings, Tags } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Tabs() {
	return (
		<div className='border-b border-zinc-800 py-4'>
			<nav className='flex items-center gap-2 max-w-[1200px] mx-auto'>
				<Link
					to=''
					className='py-1.5 px-3 bg-zinc-800 text-zinc-100 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border border-transparent'
				>
					<ListVideo className='size-4' />
					Uploads
				</Link>

				<Link
					to=''
					className='py-1.5 px-3 text-zinc-300 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border border-transparent hover:border-zinc-800'
				>
					<Tags className='size-4' />
					Tags
				</Link>

				<Link
					to=''
					className='py-1.5 px-3 text-zinc-300 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border border-transparent hover:border-zinc-800'
				>
					<Settings className='size-4' />
					Settings
				</Link>

				<Link
					to=''
					className='py-1.5 px-3 text-zinc-300 inline-flex items-center text-sm gap-1.5 font-medium rounded-full border border-transparent hover:border-zinc-800'
				>
					<Code2 className='size-4' />
					Developers
				</Link>
			</nav>
		</div>
	)
}
