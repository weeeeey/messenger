import { withAuth } from 'next-auth/middleware';

export default withAuth({ pages: { signIn: '/' } });

export const config = {
    matcher: ['users/:path*'],
};

// 위의 코드는 Next.js 프레임워크와 Next.js Authentication을 사용하는 애플리케이션에서 사용되는 중간웨어(middleware)의 예시입니다.

// import { withAuth } from 'next-auth/middleware';: 이 코드는 next-auth/middleware 패키지에서 withAuth 미들웨어를 가져오고 있습니다.
//  이 미들웨어는 인증(authentication)과 관련된 기능을 다룹니다.

//
// export default withAuth({ pages: { signIn: '/' } });: 이 코드는 withAuth 미들웨어를 기본 내보내기(default export)로 설정하고 있습
// 니다. withAuth 함수는 옵션 객체를 받으며, 여기서는 pages라는 속성을 설정하고 있습니다. pages 객체 내에서는 signIn 속성을 설정하고 루트 경로 '/'로 지정하고 있습니다.
// 이는 사용자가 로그인 페이지에 접근할 때, 루트 경로로 리디렉션되도록 하는 설정입니다.

//
// export const config = { matcher: ['users/:path*'] };: 이 코드는 다른 모듈에서 사용할 수 있는 config 객체를 내보내고 있습니다. conf
// ig 객체 내에서 matcher 속성을 설정하고 있습니다. matcher는 배열 형태로 되어 있으며, 여기서는 단일 항목인 'users/:path*'를 가지고 있습니다.
// 이것은 Next.js 라우팅에 대한 커스텀 매처(matcher)로 사용됩니다. 매처는 특정 경로 패턴을 기반으로 라우팅을 처리하는 데 사용됩니다. :path*는 "users/" 뒤에 오는 모든 경로에 대응됩니다.

//
// 이 코드는 Next.js 애플리케이션에서 인증과 관련된 기능을 다루는데 사용되며, 로그인 페이지가 루트 경로로 리디렉션되도록 설정되어 있
// 고, 또한 'users/:path*' 경로 패턴에 대한 커스텀 매처가 설정되어 있습니다. 실제로는 이 코드가 사용되는 컴포넌트나 페이지에서 해당 미들웨어를 어떻게 사용하는지에 따라 동작이 달라질 수 있습니다.
