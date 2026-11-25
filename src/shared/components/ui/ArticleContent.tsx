type Props = {
  sanitizedHtml: string
}

export function ArticleContent({ sanitizedHtml }: Props) {
  return (
    <article
      className={[
        'w-full max-w-[47.5rem] break-words text-lg leading-[1.7] text-foreground',
        '[&_p]:my-5 [&_p]:text-muted-foreground',
        '[&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-foreground sm:[&_h2]:text-3xl',
        '[&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:scroll-mt-24 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-foreground sm:[&_h3]:text-2xl',
        '[&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_li]:pl-1 [&_li]:text-muted-foreground',
        '[&_a]:break-words [&_a]:text-foreground [&_a]:underline [&_a]:decoration-primary [&_a]:underline-offset-4 [&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-ring',
        '[&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-muted-foreground',
        '[&_figure]:my-8 [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground',
        '[&_table]:my-0 [&_table]:w-full [&_table]:min-w-[36rem] [&_table]:border-collapse [&_th]:border-b [&_th]:border-border [&_th]:bg-soft [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border-b [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_tbody_tr:nth-child(even)]:bg-soft/50',
        '[&_pre]:my-6 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-soft [&_pre]:p-4 [&_code]:rounded [&_code]:bg-soft [&_code]:px-1 [&_code]:py-0.5 [&_pre_code]:bg-transparent [&_pre_code]:p-0',
        '[&_hr]:my-8 [&_hr]:border-border',
      ].join(' ')}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}
