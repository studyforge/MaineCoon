data "aws_iam_role" "lab" {
  name = "LabRole"
}

data "aws_eks_cluster_auth" "eks_auth" {
  name = aws_eks_cluster.mainecoon.name
}