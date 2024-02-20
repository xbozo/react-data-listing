import { LucideFileDown, LucideMoreHorizontal, LucidePlus, LucideSearch } from 'lucide-react'
import { Header } from '../components/header'
import { Pagination } from '../components/pagination'
import { Tabs } from '../components/tabs'
import { Button } from '../components/ui/button'
import { Control, Input } from '../components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../components/ui/table'

export function Home() {
	return (
		<div className='py-10 space-y-8'>
			<div>
				<Header />
				<Tabs />
			</div>

			<main className='max-w-6xl mx-auto space-y-5 '>
				<div className='flex items-center gap-3'>
					<h1 className='text-xl font-bold'>Tags</h1>

					<Button
						variant='primary'
						className='inline-flex items-center gap-1.5 text-xs bg-teal-300 text-teal-950 font-medium rounded-full px-1.5 py-1'
					>
						<LucidePlus className='size-3' />
						Create new
					</Button>
				</div>

				<div className='flex items-center justify-between'>
					<Input variant='filter'>
						<LucideSearch className='size-3' />
						<Control placeholder='Search tags' />
					</Input>

					<Button>
						<LucideFileDown className='size-3' />
						Export
					</Button>
				</div>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead></TableHead>
							<TableHead>Tag</TableHead>
							<TableHead>Amount of videos</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{Array.from({ length: 10 }).map((_, index) => {
							return (
								<TableRow key={index}>
									<TableCell></TableCell>

									<TableCell>
										<div className='flex flex-col gap-0.5'>
											<span className='font-medium'>React</span>
											<span className='text-xs text-zinc-500'>
												8bba1b27-57b7-4c4c-b415-4625c9c80d52
											</span>
										</div>
									</TableCell>

									<TableCell className='text-zinc-300'>13 video(s)</TableCell>

									<TableCell className='text-right'>
										<Button size='icon'>
											<LucideMoreHorizontal className='size-4' />
										</Button>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>

				<Pagination />
			</main>
		</div>
	)
}
