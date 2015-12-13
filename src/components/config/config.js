module.exports = {
  "TrustedAdvisor": {
    "Checks": [
      {
        "Name": "Security Groups - Specific Ports Unrestricted",
        "DefaultText": "%X of %Y security group rules allow unrestricted access to a specific port.",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns": [
          0,
          1,
          2,
          3,
          5
        ]
      },
      {
        "Name": "Security Groups - Unrestricted Access",
        "DefaultText": "%X of %Y security group rules have a source IP address with a /0 suffix.",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns": [
          0,
          1,
          2,
          3,
          4,
          6
        ]
      },
      {
        "Name": "ELB Listener Security",
        "DefaultText": "%X of %Y load balancers have listeners that do not use recommended security configurations.",
        "SuppressionText": "%X items have been excluded",
        "DefaultDisplayColumns": [
          0,
          1,
          2,
          3,
          4
        ]
      },
      {
        "Name": "ELB Security Groups",
        "DefaultText": "%X of %Y load balancers are associated with security groups that are either missing or incorrectly configured.",
        "SuppressionText": "%X items have been excluded"
      },
      {
        "Name": "Amazon RDS Security Group Access Risk",
        "DefaultText": "%X of %Y Amazon RDS security group rules create potential security vulnerabilities by granting global access.",
        "SuppressionText": "%X items have been excluded"
      },
      {
        "Name": "Amazon Route 53 MX Resource Record Sets and Sender Policy Framework",
        "DefaultText": "%X of %Y MX resource record sets do not have a corresponding SPF resource record set.",
        "SuppressionText": "%X items have been excluded"
      },
      {
        "Name": "Amazon S3 Bucket Permissions",
        "DefaultText": "%X of %Y buckets have permission properties that grant global access.",
        "SuppressionText": "%X items have been excluded"
      },
      {
        "Name": "AWS CloudTrail Logging",
        "DefaultText": "%X of %Y regions are not logging activity by using CloudTrail.",
        "SuppressionText": "%X items have been excluded"
      },
      {
        "Name": "CloudFront Custom SSL Certificates in the IAM Certificate Store",
        "DefaultText": "%X of %Y custom SSL certificates are expired, will soon expire, or are incorrectly configured.",
        "SuppressionText": "%X items have been excluded"
      },
      {
        "Name": "IAM Password Policy",
        "DefaultText": "Password policy is enabled, and all content requirements are enabled",
        "SuppressionText": "%X items have been excluded"
      },
      {
        "Name": "IAM Use",
        "DefaultText": "At least one IAM user, group, or role has been created for this account",
        "SuppressionText": "%X items have been excluded"
      },
      {
        "Name": "MFA on Root Account",
        "DefaultText": "MFA is enabled on the root account",
        "SuppressionText": "%X items have been excluded"
      },
      {
        "Name": "CloudFront SSL Certificate on the Origin Server",
        "DefaultText": "%X of %Y certificates on your origin are expired, will soon expire, use outdated encryption, or could not be examined.",
        "SuppressionText": "%X items have been excluded"
      }
    ]
  }
};