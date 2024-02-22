import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LucideCheck, LucideLoader2, LucideX } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { getSlugFromString } from '../utils/get-slug-from-string'
import { Button } from './ui/button'

const createTagSchema = z.object({
	title: z.string().min(3, { message: 'Minimum 3 characters.' }),
})

type CreateTagSchema = z.infer<typeof createTagSchema>

export function CreateTagForm() {
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		watch,
		formState: { isSubmitting, errors },
	} = useForm<CreateTagSchema>({
		resolver: zodResolver(createTagSchema),
	})

	const slug = watch('title') ? getSlugFromString(watch('title')) : ''

	const { mutateAsync } = useMutation({
		mutationKey: [],
		mutationFn: async ({ title }: CreateTagSchema) => {
			await new Promise((resolve) => setTimeout(resolve, 2000)) // delay for dev

			await fetch('http://localhost:3333/tags', {
				method: 'POST',
				body: JSON.stringify({
					title,
					slug,
					amountOfVideos: 0,
				}),
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['get-tags'],
			})
		},
	})

	async function createTag({ title }: CreateTagSchema) {
		await mutateAsync({ title })
	}

	return (
		<form
			className='w-full space-y-6'
			onSubmit={handleSubmit(createTag)}
		>
			<div className='space-y-2'>
				<label
					className='text-sm font-medium block'
					htmlFor='title'
				>
					Tag name
				</label>

				<input
					className='border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm'
					id='title'
					type='text'
					{...register('title')}
				/>

				{errors?.title && <p className='text-sm text-red-400'>{errors.title.message}</p>}
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
					className='bg-teal-400 text-teal-950 disabled:cursor-not-allowed'
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<LucideLoader2 className='size-3 animate-spin' />
					) : (
						<LucideCheck className='size-3' />
					)}
					Save
				</Button>
			</div>
		</form>
	)
}
