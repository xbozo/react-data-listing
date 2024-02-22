import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { LucideCheck, LucideX } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'

const createTagSchema = z.object({
	title: z.string().min(3, { message: 'Minimum 3 characters.' }),
	slug: z.string(),
})

type CreateTagSchema = z.infer<typeof createTagSchema>

function getSlugFromString(input: string): string {
	return input
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^\w\s]/g, '')
		.replace(/\s+/g, '-')
}

export function CreateTagForm() {
	const { register, handleSubmit, watch } = useForm<CreateTagSchema>({
		resolver: zodResolver(createTagSchema),
	})

	function createTag(data: CreateTagSchema) {
		console.log(data)
	}

	const slug = watch('title') ? getSlugFromString(watch('title')) : ''

	return (
		<form
			className='w-full space-y-6'
			onSubmit={handleSubmit(createTag)}
		>
			<div className='space-y-2'>
				<label
					className='text-sm font-medium block'
					htmlFor='name'
				>
					Tag name
				</label>
				<input
					className='border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm'
					id='name'
					type='text'
					{...register('title')}
				/>
			</div>

			<div className='space-y-2'>
				<label
					className='text-sm font-medium block'
					htmlFor='slug'
				>
					Slug
				</label>
				<input
					className='border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm text-z'
					type='text'
					readOnly
					id='slug'
					value={slug}
					{...register('slug')}
				/>
			</div>

			<div className='flex items-center justify-end gap-2'>
				<Dialog.Close asChild>
					<Button>
						<LucideX className='size-3' />
						Cancel
					</Button>
				</Dialog.Close>

				<Button
					type='submit'
					className='bg-teal-400 text-teal-950'
				>
					<LucideCheck className='size-3' />
					Save
				</Button>
			</div>
		</form>
	)
}
