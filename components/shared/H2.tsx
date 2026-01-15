export function H2({children}: {children: string}) {
	const id = children.toLowerCase().replace(/\s+/g, '-')

	return (
		<h2 id={id}>{children}</h2>
	)
}
