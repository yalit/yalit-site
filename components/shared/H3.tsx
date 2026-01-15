export function H3({children}: {children: string}) {
	const id = children.toLowerCase().replace(/\s+/g, '-')

	return (
		<h3 id={id}>{children}</h3>
	)
}
