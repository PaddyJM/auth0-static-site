import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Source } from 'aws-cdk-lib/aws-s3-deployment'
import * as path from 'path'

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const bucket = new cdk.aws_s3.Bucket(this, 'auth0-test-bucket')

    new cdk.aws_s3_deployment.BucketDeployment(this, 'auth0-test-deployment', {
      destinationBucket: bucket,
      sources: [Source.asset(path.resolve(__dirname, '../../build'))],
    })

    const distribution = new cdk.aws_cloudfront.Distribution(
      this,
      'auth0-test-distribution',
      {
        defaultBehavior: {
          origin: new cdk.aws_cloudfront_origins.S3Origin(bucket),
          cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_DISABLED,
        },
        defaultRootObject: 'index.html',
      },
    )

    new cdk.CfnOutput(this, 'auth0-test-distribution-name', {
      value: distribution.domainName,
    })
  }
}
