type HeaderProps = {
  title: string
}
const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <section>
        <h2 className="mb-10 text-center">{title}</h2>
      </section>
    </>
  )
}

export default Header
