import { Card, Typography } from 'antd'
import { useEffect, useState } from 'react'

// type TocProps = {
//   article: HTMLElement
// }
type Catalog = {
  content: string
  anchor: number
}
function findIndex(arr: number[], n: number) {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === n) {
      return mid
    } else if (arr[mid] < n) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return left
}
// function findRange(arr: number[], n: number) {
//   const index = findIndex(arr, n)
//   if (arr[index] === n) {
//     return [index, index]
//   } else {
//     return [index - 1, index]
//   }
// }
const Toc = () => {
  const [catalogList, setCatalogList] = useState<Catalog[]>([])
  const [anchorList, setAnchorList] = useState<number[]>([])
  const [currentHeading, setCurrentHeading] = useState(0)
  useEffect(() => {
    const headings: NodeListOf<HTMLHeadingElement> = document
      .querySelector('article')!
      .querySelectorAll('h1,h2,h3,h4,h5,h6')
    let catalogs: Catalog[] = []
    let anchors: number[] = []
    headings?.forEach((heading: HTMLHeadingElement) => {
      console.dir(heading)

      catalogs.push({
        content: String(heading.innerHTML),
        anchor: heading.offsetTop
      })
      anchorList.push(heading.offsetTop)
    })
    window.addEventListener('scroll', () => {
      const index = findIndex(anchorList, window.scrollY)
      if (index - 2 < 0) {
        setCurrentHeading(0)
      } else if (index - 2 !== currentHeading && index < anchorList.length) {
        setCurrentHeading(index - 1)
      } else {
        setCurrentHeading(anchorList.length - 1)
      }
    })
    setCatalogList(catalogs)
    setAnchorList(anchors)
  }, [])
  // const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6')
  const handleClick = (index: number) => {
    window.scrollTo({
      top: catalogList[index].anchor
    })
  }
  return (
    <>
      <div className="sticky top-21">
        <Card title="目录">
          <ul>
            {catalogList.map((item, index) => {
              return (
                <li
                  key={item.anchor}
                  className="list-none cursor-pointer"
                  onClick={() => {
                    handleClick(index)
                  }}
                >
                  <Typography.Text type={index === currentHeading ? undefined : 'secondary'}>
                    {item.content}
                  </Typography.Text>
                </li>
              )
            })}
          </ul>
        </Card>
      </div>
    </>
  )
}

export default Toc
