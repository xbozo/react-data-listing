import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
	LucideFileDown,
	LucideFilter,
	LucideMoreHorizontal,
	LucidePlus,
	LucideSearch,
} from 'lucide-react'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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

export interface Tag {
	title: string
	amountOfVideos: number
	id: string
}

export interface TagResponse {
	first: number
	prev: number | null
	next: number
	last: number
	pages: number
	items: number
	data: Tag[]
}

export function Home() {
	const [searchParams, setSearchParams] = useSearchParams()

	const urlFilter = searchParams.get('filter') ?? ''
	const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

	const [filter, setFilter] = useState(urlFilter)

	const { data: tagsResponse, isLoading } = useQuery<TagResponse>({
		queryKey: ['get-tags', page, urlFilter],
		queryFn: async () => {
			const res = await fetch(
				`http://localhost:3333/tags?_page=${page}&_per_page=10&title=${urlFilter}`
			)
			const data = await res.json()

			await new Promise((resolve) => setTimeout(resolve, 1000)) // delay for dev

			return data
		},
		placeholderData: keepPreviousData, // stop layout shift
	})

	if (isLoading) {
		return null
	}

	function handleFilter() {
		setSearchParams((params) => {
			params.set('page', '1')
			params.set('filter', filter)

			return params
		})
	}

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
					<div className='flex items-center gap-2'>
						<Input variant='filter'>
							<LucideSearch className='size-3' />
							<Control
								placeholder='Search tags'
								onChange={(e) => setFilter(e.target.value)}
								value={filter}
							/>
						</Input>

						<Button onClick={handleFilter}>
							<LucideFilter className='size-3' />
							Filter
						</Button>
					</div>

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
						<Suspense fallback={<div>Carregando...</div>}>
							{tagsResponse?.data.map((tag) => {
								return (
									<TableRow key={tag.id}>
										<TableCell></TableCell>

										<TableCell>
											<div className='flex flex-col gap-0.5'>
												<span className='font-medium'>{tag.title}</span>
												<span className='text-xs text-zinc-500'>{tag.id}</span>
											</div>
										</TableCell>

										<TableCell className='text-zinc-300'>{tag.amountOfVideos} video(s)</TableCell>

										<TableCell className='text-right'>
											<Button size='icon'>
												<LucideMoreHorizontal className='size-4' />
											</Button>
										</TableCell>
									</TableRow>
								)
							})}
						</Suspense>
					</TableBody>
				</Table>

				<Suspense fallback={<div>Carregando...</div>}>
					{tagsResponse && (
						<Pagination
							pages={tagsResponse.pages}
							items={tagsResponse.items}
							page={page}
						/>
					)}
				</Suspense>
			</main>
		</div>
	)
}
